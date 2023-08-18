'use client'
import { DateTimePicker } from "@mui/x-date-pickers";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CalendarForm() {
  const CALENDAR_ID = 'af5fec18280c446e3c9b359d0d8089d6a352fb97f2c228e88de1caba48cbeccc@group.calendar.google.com'

  const supabase = createClientComponentClient()
  const [session, setSession] = useState()

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      setSession(data)
    }
    getData();
  }, []);

  const [isLoading, setIsLoading] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()

  const createEvent = async () => {
    setIsLoading(true)
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      },
      'end': {
        'dateTime': end.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      }
    }

    await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + session.session.provider_token // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <div className="flex flex-col items-start w-auto">
        <label>Date start</label>
        <DateTimePicker disablePast onChange={setStart} />
      </div>
      <div className="flex flex-col items-start w-auto">
        <label>Date end</label>
        <DateTimePicker disablePast onChange={setEnd} />
      </div>
      <Input label="Event Name" name="event_name" placeholder="Ej. Limpieza dental" onChange={(e) => { setEventName(e.target.value) }} />
      <Input label="Event Description" name="event_name" placeholder="Ej. Limpieza profunda" onChange={(e) => { setEventDescription(e.target.value) }} />
      <Button onClick={() => createEvent()} color="primary" isDisabled={isLoading}>Crear evento</Button>
    </div>
  )
}
