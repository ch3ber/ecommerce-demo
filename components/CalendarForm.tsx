'use client'
import { DateTimePicker } from "@mui/x-date-pickers";
import { Button, Divider } from "@nextui-org/react";
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
  }, [supabase]);

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
    <>
      <h2 className="font-bold text-center text-2xl">Agenda tu cita</h2>
      <Divider className="my-10" />
      <div className="w-full rounded-md shadow-md flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col items-start w-auto">
            <label>Dia y hora de inicio</label>
            <DateTimePicker disablePast onChange={setStart} />
          </div>
          <div className="flex flex-col items-start w-auto">
            <label>Dia y hora de fin</label>
            <DateTimePicker disablePast onChange={setEnd} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-5">
          <Input label="Event Name" name="event_name" placeholder="Ej. Limpieza dental" onChange={(e) => { setEventName(e.target.value) }} />
          <Input label="Event Description" name="event_name" placeholder="Ej. Limpieza profunda" onChange={(e) => { setEventDescription(e.target.value) }} />
        </div>
      </div>
      <Button onClick={() => createEvent()} color="primary" isDisabled={isLoading} className="mt-10">Crear evento</Button>
    </>
  )
}
