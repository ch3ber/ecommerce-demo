'use client'
import { DateTimePicker } from "@mui/x-date-pickers";
import { Button, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CalendarForm() {
  const supabase = createClientComponentClient()
  const [session, setSession] = useState()

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      // @ts-ignore
      setSession(data)
      console.log(data)
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
    const data = {
      // @ts-ignore
      providerToken: session.session.provider_token,
      event: {
        'summary': eventName,
        'description': eventDescription,
        'start': {
          // @ts-ignore
          'dateTime': start.toISOString(), // Date.toISOString() ->
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
        },
        'end': {
          // @ts-ignore
          'dateTime': end.toISOString(), // Date.toISOString() ->
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
        }
      }
    }

    try {
      const res = await fetch('/api/checkout', {
        method: "POST",
        body: JSON.stringify(data)
      })
      const json = await res.json()
      console.log(json.url)
      window.location.href = json.url
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 className="font-bold text-center text-2xl">Agenda tu cita</h2>
      <Divider className="my-10" />
      <div className="w-full rounded-md shadow-md flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col items-start w-auto">
            <label>Dia y hora de inicio</label>
            {/* @ts-ignore */}
            <DateTimePicker disablePast onChange={setStart} />
          </div>
          <div className="flex flex-col items-start w-auto">
            <label>Dia y hora de fin</label>
            {/* @ts-ignore */}
            <DateTimePicker disablePast onChange={setEnd} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-5">
          <Input label="Nombre del paciente" name="event_name" placeholder="Ej. Eber Alejo" onChange={(e) => { setEventName('Cita de: ' + e.target.value) }} />
          <Input label="Tratamiento" name="event_name" placeholder="Ej. Limpieza profunda" onChange={(e) => { setEventDescription(e.target.value) }} />
        </div>
      </div>
      <Button onClick={() => createEvent()} color="primary" isDisabled={false} className="mt-10">Crear evento</Button>
    </>
  )
}
