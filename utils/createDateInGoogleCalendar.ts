const CALENDAR_ID = 'af5fec18280c446e3c9b359d0d8089d6a352fb97f2c228e88de1caba48cbeccc@group.calendar.google.com'
const GOOGLE_CALENDAR_FULL_URL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`

// @ts-ignore
export const createDateInGoogleCalendar = async (providerToken: string, eventData) => {
  const googleCalendarResponse = await fetch(GOOGLE_CALENDAR_FULL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + providerToken,
    },
    body: JSON.stringify(eventData)
  })

  return googleCalendarResponse
}
