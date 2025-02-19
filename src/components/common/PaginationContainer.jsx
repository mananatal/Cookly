import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";
function PaginationContainer({currPage,setCurrPage,totalPage}) {


    const pageBeforeCurrPage=Array.from({length:4},(_,ind)=>currPage-ind).filter((p)=>p>0).reverse();

    const pageAfterCurrPage=Array.from({length:5},(_,ind)=>currPage+ind+1).filter((p)=>p<=totalPage);


    const pages=[...pageBeforeCurrPage,...pageAfterCurrPage];

  return (
      <div className="flex items-center gap-4 justify-center p-5 mt-6">

          {/* Previous Button */}
          <button
              className={`p-3 rounded-full transition ${currPage === 0
                      ? "bg-gray-200 text-gray-400 "
                      : "bg-gray-100 text-gray-700 hover:bg-orange-200"
                  }`}
              disabled={currPage === 0 || totalPage==0}
              onClick={() => setCurrPage((prev) => prev - 1)}
          >
              <ChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-3">
              {pages.map((page, ind) => (
                  <button
                      key={ind}
                      className={`px-4 py-2 text-lg font-semibold rounded-lg transition ${currPage === page - 1
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-orange-200"
                          }`}
                      onClick={() => setCurrPage(page - 1)}
                  >
                      {page}
                  </button>
              ))}
          </div>

          {/* Next Button */}
          <button
              className={`p-3 rounded-full transition ${currPage === totalPage - 1
                      ? "bg-gray-200 text-gray-400 "
                      : "bg-gray-100 text-gray-700 hover:bg-orange-200"
                  }`}
              disabled={currPage == totalPage - 1 || totalPage==0}
              onClick={() => setCurrPage((prev) => prev + 1)}
          >
              <ChevronRight size={20} />
          </button>

      </div>

  )
}

export default PaginationContainer