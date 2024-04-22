import React, { useEffect, useState } from 'react'
import './MainPage.scss'

// import { FiMap } from 'react-icons/fi'

import CardBlanc from '../../Components/atoms/CardBlanc'
import LineChart from '../../Components/molecules/LineChart'
import Table from '../../Components/atoms/Table'
import AASelector from '../../Components/atoms/AASelector'
import Banner from '../../Components/atoms/Banner'
import {
  SeriesOrganizations,
  Serie,
  SeriesGrouped,
  TypeZonesSelection,
} from '../../types/SeriesGroup'
import Switch from '../../Components/atoms/Switch'
import { ChartData } from 'chart.js'
import { dataParce, plotDataParce } from './utils'
import UseFetchDataB from '../../Hooks/MainPage/UseFetchDataB'
import { Organizations } from '../../types/Organization'

const MainPage = () => {
  const [apiQueryUriB, setApiQueryUriB] = useState<string>('')
  const [organizationQuery] = useState<string>('/organizations/')
  const [firstSeriesData, setFirstSeriesData] = useState<Serie[] | undefined>()
  const [secondarySeriesData, setSecondarySeriesData] = useState<
    Serie[] | undefined
  >()

  const [organizationIndexSelected, setOrganizationIndexSelected] = useState(-1)
  const [typeZoneSelection, setTypeZoneSelection] =
    useState<TypeZonesSelection>(TypeZonesSelection['No selected'])
  const [isAdasa, setIsAdasa] = useState<boolean>(true)
  const [plotDataB, setPlotDataB] = useState<ChartData<'line'>>()


  const {
    data: organizationData,
    loading: organizationDataLoding,
    // error,
  } = UseFetchDataB<Organizations>(organizationQuery)
  const organizationOptions = organizationData?.organizations
    ? [
        ...organizationData.organizations.map((zone, i) => {
          return { value: i, label: zone.organization }
        }),
        { value: organizationData?.organizations.length, label: 'All zones' },
        { value: -1, label: 'No zones selected' },
      ]
    : []
    
  const {
    data: groupedDataB,
    loading: groupedLoadingB,
    error: groupedErrorB,
  } = UseFetchDataB<SeriesGrouped | SeriesOrganizations>(
    apiQueryUriB,
    typeZoneSelection === TypeZonesSelection['Single zone']
      ? organizationOptions[organizationIndexSelected].label
      : undefined,
  )
  console.log('DataB', {
    groupedDataB,
    groupedLoadingB,
    groupedErrorB,
  })

  useEffect(() => {
    if (groupedLoadingB) return
    console.log('Grouped data All selected ->', groupedDataB)
    dataParce({
      typeSelection: typeZoneSelection,
      organizationType:
        typeZoneSelection === TypeZonesSelection['Single zone']
          ? organizationOptions[organizationIndexSelected].label
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
          ? organizationOptions[organizationIndexSelected].label
          : undefined,
      groupedData: groupedDataB,
      setPlotData: setPlotDataB,
    })
  }, [groupedDataB, isAdasa])

  const handleOrganizationSelection = (index: number) => {
    switch (index) {
      case 0:
        setTypeZoneSelection(TypeZonesSelection['Single zone'])
        setApiQueryUriB('/time_series/grouped_by_organization/')
        break
      case 1:
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
  return (
    <>
      <main className="main_container">
        <section className="main_header">
          <CardBlanc>
            <section className="main_header_card_section">
              {organizationDataLoding ? (
                ''
              ) : (
                <AASelector
                  options={organizationOptions}
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
                    ? organizationOptions[organizationIndexSelected].label
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
                        {secondarySeriesData ? (
                          <Table data={secondarySeriesData} />
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
