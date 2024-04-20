import React from 'react'
import './MainPage.scss'
import CardBlanc from '../components/atoms/CardBlanc'
import AASelector from '../components/atoms/AASelector'
import Table from '../components/atoms/Table'
import BarChart from '../components/molecules/BarChart'

const EncodeDecode = () => {
  interface DataEntry {
    timestamp: string
    variable: string
    organization: string
    value: number
    ingestion_time: string
  }
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
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
                  <BarChart data={data} />
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
                <article className="main_page_article">
                  <AASelector
                    options={options}
                    defaultValue="Select a organization"
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
