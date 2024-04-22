import React, { useEffect, useState } from 'react'
import './MainPage.scss'

// import { FiMap } from 'react-icons/fi'

import UseLoadCsv from '../../Hooks/MainPage/UseLoadCsv'
import CardBlanc from '../../Components/atoms/CardBlanc'
import LineChart from '../../Components/molecules/LineChart'
import Table from '../../Components/atoms/Table'
import AASelector from '../../Components/atoms/AASelector'
import Banner from '../../Components/atoms/Banner'
import UseFetchData from '../../Hooks/MainPage/UseFetchData'
import {
  Organizations,
  Serie,
  SeriesGrouped,
  TypeZonesSelection,
} from '../../types/Organization'
// import { formatDate } from '../../utils/generalUse'
import Switch from '../../Components/atoms/Switch'
import { ChartData } from 'chart.js'
import { dataParce, plotDataParce } from './utils'
import UseFetchDataB from '../../Hooks/MainPage/UseFetchDataB'

const MainPage = () => {
  const [zonesUrl] = useState<string>('./organization_and_zones_dataset.csv')
  const [apiQueryUri] = useState<string>(
    '/time_series/grouped_by_variable_organization/',
  )
  const [apiQueryUriB, setApiQueryUriB] = useState<string>('')
  const [firstSeriesData, setFirstSeriesData] = useState<Serie[] | undefined>()
  const [secondarySeriesData, setSecondarySeriesData] = useState<
    Serie[] | undefined
  >()

  const [organizationIndexSelected, setOrganizationIndexSelected] = useState(-1)
  const [typeZoneSelection, setTypeZoneSelection] =
    useState<TypeZonesSelection>(TypeZonesSelection['No selected'])
  const [isAdasa, setIsAdasa] = useState<boolean>(true)
  // const [plotData, setPlotData] = useState<ChartData<'line'>>()
  const [plotDataB, setPlotDataB] = useState<ChartData<'line'>>()

  const {
    csvData: zonesData,
    loading: zonesLoading,
    error,
  } = UseLoadCsv(zonesUrl)

  const zoneOption = [
    ...zonesData.map((zone, i) => {
      return { value: i, label: zone.organization }
    }),
    { value: zonesData.length, label: 'All zones' },
    { value: -1, label: 'No zones selected' },
  ]

  const {
    data: groupedData,
    loading: groupedLoading,
    error: groupedError,
  } = UseFetchData<SeriesGrouped>(apiQueryUri)

  const {
    data: groupedDataB,
    loading: groupedLoadingB,
    error: groupedErrorB,
  } = UseFetchDataB<SeriesGrouped | Organizations>(
    apiQueryUriB,
    typeZoneSelection === TypeZonesSelection['Single zone']
      ? zoneOption[organizationIndexSelected].label
      : undefined,
  )
  console.log('DataB', {
    groupedDataB,
    groupedLoadingB,
    groupedErrorB,
  })

  console.log({
    groupedData,
    groupedLoading,
    groupedError,
  })

  // const adasaCHSeries = groupedData?.organizations.adasa?.values['CHL-01']

  useEffect(() => {
    if (groupedLoadingB) return
    console.log('Grouped data All selected ->', groupedDataB)
    dataParce({
      typeSelection: typeZoneSelection,
      organizationType:
        typeZoneSelection === TypeZonesSelection['Single zone']
          ? zoneOption[organizationIndexSelected].label
          : undefined,
      groupData: groupedDataB,
      isAdasa:
        typeZoneSelection === TypeZonesSelection['All selected']
          ? isAdasa
          : undefined,
      setFirstSeriesData,
      setSecondarySeriesData,
    })
    plotDataParce({
      typeSelection: typeZoneSelection,
      organizationType:
        typeZoneSelection === TypeZonesSelection['Single zone']
          ? zoneOption[organizationIndexSelected].label
          : undefined,
      groupedData: groupedDataB,
      setPlotData: setPlotDataB,
    })
  }, [groupedDataB, isAdasa])

  console.log({ firstSeriesData, secondarySeriesData })
  console.log({ zonesData, zonesLoading, error })

  const handleOrganizationSelection = (index: number) => {
    switch (index) {
      case 0:
        console.log('single organization ---> se selecciona ', index)
        setTypeZoneSelection(TypeZonesSelection['Single zone'])
        setApiQueryUriB('/time_series/grouped_by_organization/')
        break
      case 1:
        console.log('single organization ---> se selecciona ', index)
        setTypeZoneSelection(TypeZonesSelection['Single zone'])
        setApiQueryUriB('/time_series/grouped_by_organization/')
        break
      case 2:
        setTypeZoneSelection(TypeZonesSelection['All selected'])
        setApiQueryUriB('/time_series/grouped_by_variable_organization/')
        break
      case -1:
        setTypeZoneSelection(TypeZonesSelection['No selected'])
        break

      default:
        break
    }
    setOrganizationIndexSelected(index)
  }
  console.log('plot data',plotDataB)
  // useEffect(() => {
  //   const labels =
  //     groupedData?.organizations.adasa?.values['CHL-01']?.map((entry: Serie) =>
  //       formatDate(entry.ingestion_time),
  //     ) || []

  //   setPlotData(
  //     {
  //       labels,
  //       datasets: [
  //         {
  //           label: 'Value Over Time',
  //           data:
  //             groupedData?.organizations.adasa?.values['CHL-01']?.map(
  //               (entry) => entry.value,
  //             ) || [],
  //           fill: false,
  //           borderColor: 'rgb(251, 115, 163)',
  //           tension: 0.1,
  //         },
  //         {
  //           label: 'Value Over Time',
  //           data:
  //             groupedData?.organizations.adasa?.values['SPM-01']?.map(
  //               (entry) => entry.value,
  //             ) || [],
  //           fill: false,
  //           borderColor: 'rgb(246, 246, 246)',
  //           tension: 0.1,
  //         },
  //         {
  //           label: 'Value Over Time',
  //           data:
  //             groupedData?.organizations.gsinima?.values['CHL-01']?.map(
  //               (entry) => entry.value,
  //             ) || [],
  //           fill: false,
  //           borderColor: 'rgb(66, 203, 236)',
  //           tension: 0.1,
  //         },
  //         {
  //           label: 'Value Over Time',
  //           data:
  //             groupedData?.organizations.gsinima?.values['SPM-01']?.map(
  //               (entry) => entry.value,
  //             ) || [],
  //           fill: false,
  //           borderColor: 'rgb(248,14,98)',
  //           tension: 0.1,
  //         },
  //       ],
  //     } || {},
  //   )
  // }, [groupedData])
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
                        {firstSeriesData ? (
                          <Table data={firstSeriesData} />
                        ) : (
                          ''
                        )}{' '}
                      </article>
                      <article className="organization_table">
                        {firstSeriesData ? (
                          <Table data={firstSeriesData} />
                        ) : (
                          ''
                        )}{' '}
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
                    <>
                      {plotDataB ? (
                        <>
                          <Banner
                            type="info"
                            message="Zoom out with scroll to watch the plot details."
                          />

                          <LineChart data={plotDataB} />
                        </>
                      ) : (
                        ''
                      )}
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
          </aside>
        </section>
      </main>
    </>
  )
}

export default MainPage
