import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../context/searchContext'
import { IconFirstLastPage } from '../others/Icons'

const IconBacwardForward = ({ isForward = false }) => (
  <span className='material-symbols-outlined'>
    {isForward ? 'fast_forward' : 'fast_rewind'}
  </span>
)

export function PageSelector () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { page, totalPages } = resultsDetails

  const [pageButtons, setPageButtons] = useState([])

  function PageButton ({ page, selectedPage }) {
    const selectPage = () => {
      setResultsDetails(prev => ({
        ...prev,
        page
      }))
    }

    return <button className={selectedPage !== page ? 'btn_secondary' : undefined} onClick={selectPage}>{page}</button>
  }

  const jumpPages = (jumpCount) => {
    const jumpValidation = jumpCount < 0 ? page > -jumpCount : page <= totalPages - jumpCount
    if (!jumpValidation) return

    const newPage = page + jumpCount
    setResultsDetails(prev => ({
      ...prev,
      page: newPage
    }))
  }

  useEffect(() => {
    const newPageButtons = []
    const maxPage = totalPages > 7 ? 5 : totalPages
    for (let i = 1; i <= maxPage; i++) {
      newPageButtons.push({ page: i })
    }
    setPageButtons(newPageButtons)
  }, [totalPages])

  useEffect(() => {
    if (totalPages <= 7) return

    const newPageButtons = []
    const minPage = page > 2
      ? page < totalPages - 2
        ? page - 2
        : totalPages - 4
      : 1
    const maxPage = page > 2
      ? page < totalPages - 2
        ? page + 2
        : totalPages
      : 5

    for (let i = minPage; i <= maxPage; i++) {
      newPageButtons.push({ page: i })
    }
    setPageButtons(newPageButtons)
  }, [page])

  return (
    <div className='page_selector'>
      {totalPages > 0 &&
        <button
          className='jump_btn' disabled={page === 1} onClick={() => {
            setResultsDetails(prev => ({
              ...prev,
              page: 1
            }))
          }}
        ><IconFirstLastPage toFirstPage />
        </button>}
      {totalPages > 7 && <button className='jump_btn' onClick={() => jumpPages(-3)} disabled={page <= 3}><IconBacwardForward /></button>}
      {pageButtons.map(element => (
        <PageButton key={element.page} page={element.page} selectedPage={page} />
      ))}
      {totalPages > 7 && <button className='jump_btn' onClick={() => jumpPages(3)} disabled={page > totalPages - 3}><IconBacwardForward isForward /></button>}
      {totalPages > 0 &&
        <button
          className='jump_btn' disabled={page === totalPages} onClick={() => {
            setResultsDetails(prev => ({
              ...prev,
              page: totalPages
            }))
          }}
        ><IconFirstLastPage />
        </button>}
    </div>
  )
}
