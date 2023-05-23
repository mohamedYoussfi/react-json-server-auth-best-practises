import React, { useContext } from 'react'
import { ProductsContext } from '../context/context'

function DashBoard (props) {
  const [state] = useContext(ProductsContext)
  return (
    <small>
      <nav className={'p-1 text-white fw-bold'}>
        <div className={'card'}>
          <div className={'card-body'}>
            <ul className={'nav nav-pills'}>
              <li>
                <div className={'p-1 border border-info ms-1 bg-success bg-opacity-75 '}>
                  Total:{state.totalCount}
                </div>
              </li>
              <li>
                <div
                  className={'p-1 border border-info ms-1 bg-info'}>
                  Checked:{state.products.filter(p => p.checked).length}
                </div>
              </li>
              <li>
                <div className={'p-1 border border-info ms-1 bg-primary'}>
                  Total Pages :{state.totalPages}
                </div>
              </li>
              <li>
                <div className={'p-1 border border-info ms-1 bg-danger'}>
                  Page Size:{state.pageSize}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </small>
  )
}

export default DashBoard