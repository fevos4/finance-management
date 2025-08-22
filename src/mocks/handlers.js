// src/mocks/handlers.js
import { http, HttpResponse, passthrough } from 'msw'
import { users } from './db'

export const handlers = [
  // 🔹 Login handler
  http.post('/login', async ({ request }) => {
    const { slipNumber, idNumber } = await request.json()

    const user = users.find(
      (u) => u.slipNumber === slipNumber && u.idNumber === idNumber
    )

    if (!user) {
      return new HttpResponse(null, { status: 401 })
    }

    return HttpResponse.json({
      token: user.token,
      studentInfo: user.studentInfo,
      courses: user.courses || [],
      additionalFees: user.additionalFees || [],
      paymentHistory: user.paymentHistory || [],
      paymentStatus: user.paymentStatus || null,
    })
  }),

  // 🔹 Payment history handler
  http.get('/payment-history/:slipNumber', ({ params }) => {
    const { slipNumber } = params
    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      paymentHistory: user.paymentHistory || [],
      paymentStatus: user.paymentStatus || null,
    })
  }),

  // 🔹 Payment receipt handler
  http.get('/payment-receipt/:paymentId', ({ params }) => {
    const { paymentId } = params

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
                amount: payment.amount,
              },
            ],
          },
          studentInfo: user.studentInfo,
        })
      }
    }

    return new HttpResponse(null, { status: 404 })
  }),

  // 🔹 Process payment handler
  http.post('/process-payment', async ({ request }) => {
    const { slipNumber, amount, paymentMethod, paymentType } = await request.json()
    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    // simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

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
      transactionId: `TXN${Date.now()}`,
    }

    user.paymentHistory = [...(user.paymentHistory || []), newPayment]

    const totalPaid = user.paymentHistory.reduce((sum, p) => sum + p.amount, 0)
    const totalCourseCost = (user.courses || []).reduce((sum, c) => sum + c.cost, 0)
    const totalAdditionalFees = (user.additionalFees || []).reduce((sum, f) => sum + f.amount, 0)
    const totalDue = totalCourseCost + totalAdditionalFees
    const remainingBalance = Math.max(0, totalDue - totalPaid)

    user.paymentStatus = {
      totalDue,
      totalPaid,
      remainingBalance,
      status: remainingBalance === 0 ? 'paid' : 'partial',
    }

    return HttpResponse.json({
      success: true,
      payment: newPayment,
      paymentStatus: user.paymentStatus,
      message: 'Payment processed successfully',
    })
  }),

  // 🔹 Dashboard data handler
  http.get('/dashboard/:slipNumber', ({ params }) => {
    const { slipNumber } = params
    const user = users.find((u) => u.slipNumber === slipNumber)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    const totalCourseCost = (user.courses || []).reduce((sum, c) => sum + c.cost, 0)
    const totalAdditionalFees = (user.additionalFees || []).reduce((sum, f) => sum + f.amount, 0)
    const totalDue = totalCourseCost + totalAdditionalFees
    const totalPaid = (user.paymentHistory || []).reduce((sum, p) => sum + p.amount, 0)
    const remainingBalance = Math.max(0, totalDue - totalPaid)

    return HttpResponse.json({
      studentInfo: user.studentInfo,
      courses: user.courses || [],
      additionalFees: user.additionalFees || [],
      paymentSummary: {
        totalDue,
        totalPaid,
        remainingBalance,
        status: remainingBalance === 0 ? 'paid' : 'partial',
      },
    })
  }),

  // 🔹 Logout handler
  http.post('/logout', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  }),

  // 🔹 Token validation handler
  http.get('/validate-token', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = users.find((u) => u.token === token)

    if (!user) {
      return new HttpResponse(null, { status: 401 })
    }

    return HttpResponse.json({
      valid: true,
      studentInfo: user.studentInfo,
    })
  }),

  // ✅ Passthrough root requests (avoid MSW warnings)
  http.get('/', () => passthrough()),
]
