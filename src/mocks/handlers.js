// src/mocks/handlers.js

import { http, HttpResponse } from 'msw'
import { users } from './db'

export const handlers = [
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
]
