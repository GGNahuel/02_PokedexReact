import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../context/searchContext'

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
    <div>
      {totalPages > 7 && <button onClick={() => jumpPages(-3)} disabled={page <= 3}>ant</button>}
      {pageButtons.map(element => (
        <PageButton key={element.page} page={element.page} selectedPage={page} />
      ))}
      {totalPages > 7 && <button onClick={() => jumpPages(3)} disabled={page > totalPages - 3}>sig</button>}
    </div>
  )
}
