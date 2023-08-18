export default async function Calendar() {
  return (
    <>
      <section className="text-center">
        <h1 className="text-2xl font-bold mt-10">Calendar</h1>
        <p>Selecciona un horario disponible para tu cita y te enviaremos un correo confirmando tu cita al finalizar tu compra.</p>
        <div className="rounded-lg overflow-hidden h-80 m-10">
          <iframe className='w-full h-full' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FMexico_City&mode=WEEK&hl=es_419&showTabs=0&showCalendars=1&showDate=1&showNav=1&showTitle=0&src=YWY1ZmVjMTgyODBjNDQ2ZTNjOWIzNTlkMGQ4MDg5ZDZhMzUyZmI5N2YyYzIyOGU4OGRlMWNhYmE0OGNiZWNjY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73"></iframe>
        </div>
      </section>
    </>
  );
}
