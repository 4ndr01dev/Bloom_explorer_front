import React from 'react'
import './MainPage.scss'
import CardBlanc from '../components/atoms/CardBlanc'
import AASelector from '../components/atoms/AASelector'
import Table from '../components/atoms/Table'
import LineChart from '../components/molecules/LineChart'

const EncodeDecode = () => {
  interface DataEntry {
    timestamp: string
    variable: string
    organization: string
    value: number
    ingestion_time: string
  }
  interface ZoneInfo {
    organization: string
    zone_id: number
    zone: string
    polygon_decoded: string
  }
  const zones: ZoneInfo[] = [
    {
      organization: 'gsinima',
      zone_id: 25,
      zone: 'caldera',
      polygon_decoded:
        '-70.87416271129088,-27.014335684429216;-70.83452128203115,-27.030838768713313;-70.8',
    },
    {
      organization: 'adasa',
      zone_id: 27,
      zone: 'antofagasta',
      polygon_decoded:
        '-70.42940139770508,-23.534481206739827;-70.43146133422852,-23.541563231866057;-70.42914390563965,-',
    },
  ]
  const zonesDisplay = zones.map((zone) => {
    return { organization: zone.organization, zone: zone.zone }
  })

  console.log(zonesDisplay)
  const zoneOption = [
    ...zones.map((zone, i) => {
      return { value: i, label: zone.organization }
    }),
    { value: -1, label: 'All zones' },
  ]

  const dataEntries: DataEntry[] = [
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    {
      timestamp: '2024-04-13 12:00:00.000000 UTC',
      variable: 'CHL-01',
      organization: 'adasa',
      value: 1.451351643,
      ingestion_time: '2024-04-14 00:00:00.000000 UTC',
    },
    // Puedes añadir más entradas aquí de la misma forma
  ]
  const labels = dataEntries.map((entry) => entry.timestamp)
  const data = {
    labels,
    datasets: [
      {
        label: 'Value Over Time',
        data: dataEntries.map((entry) => entry.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }
  return (
    <>
      <main className="main_container">
        <header className="title">{/* <h1> Data Display </h1> */}</header>
        <section className="main_section">
          <article className="main_page_container">
            <CardBlanc>
              <div className="main_page_section">
                <header className="main_page_title">
                  {' '}
                  <h3>Data display</h3>
                </header>
                <article className="organization_plot">
                  <LineChart data={data} />
                </article>
                <article className="organization_table">
                  <Table data={dataEntries} />
                </article>
              </div>
            </CardBlanc>
          </article>
          <aside className="main_page_aside">
            <CardBlanc>
              <div className="organization_section">
                <header className="organization_title">
                  <h3>Organization selection</h3>
                </header>
                <article className="organization_table">
                  <Table data={zonesDisplay} />
                </article>
                <article className="main_page_article">
                  <AASelector
                    options={zoneOption}
                    defaultValue={-1}
                  />
                </article>
              </div>
            </CardBlanc>
          </aside>
        </section>
      </main>
    </>
  )
}

export default EncodeDecode
