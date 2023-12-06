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
        page: page - 1
      }))
    }

    return (
      <button className={selectedPage !== page && 'btn_secondary'} onClick={selectPage}>{page}</button>
    )
  }

  useEffect(() => {
    const newPageButtons = []
    for (let i = 0; i < totalPages; i++) {
      newPageButtons.push({ page: i + 1 })
    }
    setPageButtons(newPageButtons)
  }, [totalPages])

  return (
    <div>
      {pageButtons.map(element => (
        <PageButton key={element.page} page={element.page} selectedPage={page + 1} />
      ))}
    </div>
  )
}
