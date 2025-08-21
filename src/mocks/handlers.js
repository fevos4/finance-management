// src/mocks/handlers.js

import { http, HttpResponse, passthrough } from 'msw'
import { users } from './db'

export const handlers = [
  // Login handler
  http.post('/login', async ({ request }) => {
    const { slipNumber, idNumber } = await request.json()

    const user = users.find(
      (u) => u.slipNumber === slipNumber && u.idNumber === idNumber
    )

    if (user) {
      return HttpResponse.json({
        token: user.token,
        studentInfo: user.studentInfo,
        courses: user.courses,
        additionalFees: user.additionalFees,
      })
    }

    return new HttpResponse(null, { status: 401 })
  }),

  // Payment history handler
  http.get('/payment-history/:slipNumber', (req) => {
    const { slipNumber } = req.params
    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      paymentHistory: user.paymentHistory || [],
      paymentStatus: user.paymentStatus || null,
    })
  }),

  // Payment receipt handler
  http.get('/payment-receipt/:paymentId', (req) => {
    const { paymentId } = req.params

    for (const user of users) {
      const payment = (user.paymentHistory || []).find(
        (p) => String(p.id) === paymentId
      )
      if (payment) {
        return HttpResponse.json({
          payment: {
            ...payment,
            paymentDate: payment.paymentDate || payment.date || new Date().toISOString(),
            transactionId: payment.transactionId || `TXN${payment.id}`,
            items: [
              {
                description: payment.description || 'Tuition Payment',
                amount: payment.amount
              }
            ]
          },
          studentInfo: user.studentInfo,
        })
      }
    }

    return new HttpResponse(null, { status: 404 })
  }),

  // Payment processing handler
  http.post('/process-payment', async ({ request }) => {
    const { slipNumber, amount, paymentMethod, paymentType } = await request.json()

    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    await new Promise(resolve => setTimeout(resolve, 1000)) // simulate delay

    const newPayment = {
      id: Date.now(),
      receiptNumber: `R${Date.now()}`,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      paymentDate: new Date().toISOString(),
      paymentMethod: paymentMethod || 'Online',
      paymentType: paymentType || 'Tuition',
      status: 'completed',
      description: `${paymentMethod} - ${paymentType}`,
      transactionId: `TXN${Date.now()}`
    }

    if (!user.paymentHistory) {
      user.paymentHistory = []
    }
    user.paymentHistory.push(newPayment)

    const totalPaid = user.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
    const totalCourseCost = user.courses.reduce((sum, course) => sum + course.cost, 0)
    const totalAdditionalFees = user.additionalFees.reduce((sum, fee) => sum + fee.amount, 0)
    const totalDue = totalCourseCost + totalAdditionalFees
    const remainingBalance = Math.max(0, totalDue - totalPaid)

    user.paymentStatus = {
      totalDue,
      totalPaid,
      remainingBalance,
      status: remainingBalance === 0 ? 'paid' : 'partial'
    }

    return HttpResponse.json({
      success: true,
      payment: newPayment,
      paymentStatus: user.paymentStatus,
      message: 'Payment processed successfully'
    })
  }),

  // Dashboard data handler
  http.get('/dashboard/:slipNumber', (req) => {
    const { slipNumber } = req.params
    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    const totalCourseCost = user.courses.reduce((sum, course) => sum + course.cost, 0)
    const totalAdditionalFees = user.additionalFees.reduce((sum, fee) => sum + fee.amount, 0)
    const totalDue = totalCourseCost + totalAdditionalFees
    const totalPaid = user.paymentHistory ? user.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0) : 0
    const remainingBalance = Math.max(0, totalDue - totalPaid)

    return HttpResponse.json({
      studentInfo: user.studentInfo,
      courses: user.courses,
      additionalFees: user.additionalFees,
      paymentSummary: {
        totalDue,
        totalPaid,
        remainingBalance,
        status: remainingBalance === 0 ? 'paid' : 'partial'
      }
    })
  }),

  // Logout handler
  http.post('/logout', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully'
    })
  }),

  // Validate token handler
  http.get('/validate-token', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = users.find((u) => u.token === token)

    if (user) {
      return HttpResponse.json({
        valid: true,
        studentInfo: user.studentInfo
      })
    }

    return new HttpResponse(null, { status: 401 })
  }),

  // ✅ Passthrough root requests so MSW doesn't warn
  http.get('/', () => {
    return passthrough()
  })
]
