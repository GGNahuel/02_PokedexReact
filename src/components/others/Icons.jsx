export function IconSubdirectory () {
  return (
    <span className='material-symbols-outlined icon_subdir'>
      subdirectory_arrow_right
    </span>
  )
}

export function IconFirstLastPage ({ toFirstPage = false }) {
  return (
    <span className='material-symbols-outlined'>
      {toFirstPage ? 'first_page' : 'last_page'}
    </span>
  )
}
