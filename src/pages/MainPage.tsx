import React, { useEffect, useState } from 'react'
import './MainPage.scss'

// import { FiMap } from 'react-icons/fi'

import UseLoadCsv from '../Hooks/MainPage/UseLoadCsv'
import CardBlanc from '../Components/atoms/CardBlanc'
import LineChart from '../Components/molecules/LineChart'
import Table from '../Components/atoms/Table'
import AASelector from '../Components/atoms/AASelector'
import Banner from '../Components/atoms/Banner'
import UseFetchData from '../Hooks/MainPage/UseFetchData'
import { Serie, SeriesGrouped } from '../types/Organization'
import { formatDate } from '../utils/generalUse'
import Switch from '../Components/atoms/Switch'
import { ChartData } from 'chart.js'

// import Button from '../Components/atoms/Button'

const MainPage = () => {
  const [organizationIndexSelected, setOrganizationIndexSelected] = useState(-1)
  const [isAdasa, setIsAdasa] = useState<boolean>(true)
  const [plotData, setPlotData] = useState<ChartData<'line'>>()
  const [zonesUrl] = useState<string>('./organization_and_zones_dataset.csv')
  const [timeSeriesUrl] = useState<string>('./timeseries_dataset.csv')
  const [apiQueryUri] = useState<string>(
    '/time_series/grouped_by_variable_organization/',
  )

  const {
    csvData: zonesData,
    loading: zonesLoading,
    error,
  } = UseLoadCsv(zonesUrl)

  const {
    data: groupedData,
    loading: groupedLoading,
    error: groupedError,
  } = UseFetchData<SeriesGrouped>(apiQueryUri)

  console.log({
    groupedData,
    groupedLoading,
    groupedError,
  })
  const adasaCHSeries = groupedData?.organizations.adasa.values['CHL-01']
  console.log(adasaCHSeries)
  const {
    csvData: timeSeriesData,
    loading: timeSeriesLoading,
    error: timeSeriesError,
  } = UseLoadCsv(timeSeriesUrl)

  console.log({ zonesData, zonesLoading, error })
  console.log({ timeSeriesData, timeSeriesLoading, timeSeriesError })

  const handleOrganizationSelection = (index: number) => {
    setOrganizationIndexSelected(index)
  }

  const zoneOption = [
    ...zonesData.map((zone, i) => {
      return { value: i, label: zone.organization }
    }),
    { value: zonesData.length, label: 'All zones' },
    { value: -1, label: 'No zones selected' },
  ]
  useEffect(() => {
    const labels =
      adasaCHSeries?.map((entry: Serie) => formatDate(entry.ingestion_time)) ||
      []

    setPlotData(
      {
        labels,
        datasets: [
          {
            label: 'Value Over Time',
            data:
              groupedData?.organizations.adasa.values['CHL-01']?.map(
                (entry) => entry.value,
              ) || [],
            fill: false,
            borderColor: 'rgb(218, 238, 255)',
            tension: 0.1,
          },
          {
            label: 'Value Over Time',
            data:
              groupedData?.organizations.adasa.values['SPM-01']?.map(
                (entry) => entry.value,
              ) || [],
            fill: false,
            borderColor: 'rgb(246, 246, 246)',
            tension: 0.1,
          },
          {
            label: 'Value Over Time',
            data:
              groupedData?.organizations.gsinima.values['CHL-01']?.map(
                (entry) => entry.value,
              ) || [],
            fill: false,
            borderColor: 'rgb(66, 203, 236)',
            tension: 0.1,
          },
          {
            label: 'Value Over Time',
            data:
              groupedData?.organizations.gsinima.values['SPM-01']?.map(
                (entry) => entry.value,
              ) || [],
            fill: false,
            borderColor: 'rgb(251, 115, 163)',
            tension: 0.1,
          },
        ],
      } || {},
    )
  }, [groupedData])
  useEffect(() => {}, [groupedData])
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
                  {organizationIndexSelected >= 0
                    ? zoneOption[organizationIndexSelected].label
                    : 'No zone selected '}
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
                      {organizationIndexSelected == 2 ? (
                        <Switch
                          isChecked={isAdasa}
                          onToggle={() => {
                            setIsAdasa(!isAdasa)
                          }}
                          values={['gsinima', 'adasa']}
                        />
                      ) : (
                        ''
                      )}
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
                    <>{plotData ? <LineChart data={plotData} /> : ''}</>
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

export default MainPage
