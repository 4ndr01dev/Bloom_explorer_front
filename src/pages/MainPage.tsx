import React, { useState } from 'react'
import './MainPage.scss'

// import { FiMap } from 'react-icons/fi'

import UseLoadCsv from '../Hooks/MainPage/UseLoadCsv'
import CardBlanc from '../Components/atoms/CardBlanc'
import LineChart from '../Components/molecules/LineChart'
import Table from '../Components/atoms/Table'
import AASelector from '../Components/atoms/AASelector'
import Banner from '../Components/atoms/Banner'
// import Button from '../Components/atoms/Button'

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

  const zoneOption = [
    ...zonesData.map((zone, i) => {
      return { value: i, label: zone.organization }
    }),
    { value: -1, label: 'All zones' },
  ]

  const labels = timeSeriesData.map((entry) => entry.variable)
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
        <section className="main_header">
          <CardBlanc>
            <section className="main_header_card_section">
              {zonesLoading ? (
                ''
              ) : (
                <AASelector
                  options={zoneOption}
                  defaultValue={organizationIndexSelected}
                  onChange={handleOrganizationSelection}
                />
              )}
            </section>
            {/* <Button>
              <FiMap />
              View map
            </Button> */}
          </CardBlanc>
        </section>
        <section className="main_section">
          <article className="main_page_container">
            <CardBlanc>
              <div className="main_page_section">
                <header className="main_page_title">
                  <h3>Data display</h3>
                  {zoneOption[organizationIndexSelected] && !zonesLoading
                    ? zoneOption[organizationIndexSelected].label
                    : 'All zones'}
                </header>
                <section className="description">
                  <p>
                    {' '}
                    In this section you can find the data grouped by variable.
                    Them owns at selected zone.{' '}
                  </p>
                </section>
                <article className="organization_tables">
                  {organizationIndexSelected != -1 ? (
                    <>
                      <article className="organization_table">
                        {timeSeriesLoading ? (
                          ''
                        ) : (
                          <Table data={timeSeriesData} />
                        )}{' '}
                      </article>
                      <article className="organization_table">
                        {timeSeriesLoading ? (
                          ''
                        ) : (
                          <Table data={timeSeriesData} />
                        )}
                      </article>
                    </>
                  ) : (
                    <Banner
                      type="info"
                      message="Select a zone to explore it`s data"
                    />
                  )}
                </article>
              </div>
            </CardBlanc>
          </article>
          <aside className="main_page_aside">
            <CardBlanc>
              <div className="organization_section">
                <header className="organization_title">
                  <h3>Data chart</h3>
                </header>
                <section className="description">
                  <p>
                    {' '}
                    In this section you can find the line chat grouped by
                    variable. Them owns at selected zone.{' '}
                  </p>
                </section>
                <article className="organization_plot">
                  {organizationIndexSelected != -1 ? (
                    <>{timeSeriesLoading ? '' : <LineChart data={data} />}</>
                  ) : (
                    <Banner
                      type="info"
                      message="Select a zone to explore it`s data"
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
