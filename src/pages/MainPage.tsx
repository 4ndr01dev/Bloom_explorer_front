import React from 'react'
import './MainPage.scss'
import CardBlanc from '../components/atoms/CardBlanc'
import UseLoadCsv from '../Hooks/MainPage/UseLoadCsv'

const EncodeDecode = () => {
  const { data, loading, error } = UseLoadCsv(
    './organization_and_zones_dataset.csv',
  )
  console.log({ data, loading, error })
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
                <article className="main_page_article">
                  <p>data display</p>
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
                  <p>Selector</p>{' '}
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
