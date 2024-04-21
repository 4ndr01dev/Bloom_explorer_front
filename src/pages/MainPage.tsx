import React, { useState } from 'react'
import './MainPage.scss'

import UseLoadCsv from '../Hooks/MainPage/UseLoadCsv'
import CardBlanc from '../Components/atoms/CardBlanc'
import LineChart from '../Components/molecules/LineChart'
import Table from '../Components/atoms/Table'
import AASelector from '../Components/atoms/AASelector'

const EncodeDecode = () => {
  const [organizationIndexSelected, setOrganizationIndexSelected] = useState(-1)
  const [zonesUrl] = useState('./organization_and_zones_dataset.csv')
  const [timeSeriesUrl] = useState('./timeseries_dataset.csv')

  const {
    csvData: zonesData,
    loading: zonesLoading,
    error,
  } = UseLoadCsv(zonesUrl)

  const {
    csvData: timeSeriesData,
    loading: timeSeriesLoading,
    error: timeSeriesError,
  } = UseLoadCsv(timeSeriesUrl)

  console.log({ zonesData, zonesLoading, error })
  console.log({ timeSeriesData, timeSeriesLoading, timeSeriesError })

  const handleOrganizationSelection = (index: number) => {
    console.log(index)
    setOrganizationIndexSelected(index)
  }

  const zonesDisplay = zonesData?.map((zone) => {
    return { organization: zone.organization, zone: zone.zone }
  })

  const zoneOption = [
    ...zonesData.map((zone, i) => {
      return { value: i, label: zone.organization }
    }),
    { value: -1, label: 'All zones' },
  ]

  const labels = timeSeriesData.map((entry) => entry.timestamp)
  const data = {
    labels,
    datasets: [
      {
        label: 'Value Over Time',
        data: timeSeriesData.map((entry) => entry.value),
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
                  <h3>Data display</h3>
                  {zoneOption[organizationIndexSelected]
                    ? zoneOption[organizationIndexSelected].label
                    : 'All zones'}
                </header>
                <article className="organization_plot">
                  {timeSeriesLoading ? '' : <LineChart data={data} />}
                </article>
                <article className="organization_table">
                  {timeSeriesLoading ? '' : <Table data={timeSeriesData} />}
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
                  {zonesLoading ? '' : <Table data={zonesDisplay} />}
                </article>
                <article className="main_page_article">
                  {zonesLoading ? (
                    ''
                  ) : (
                    <AASelector
                      options={zoneOption}
                      defaultValue={organizationIndexSelected}
                      onChange={handleOrganizationSelection}
                    />
                  )}
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
