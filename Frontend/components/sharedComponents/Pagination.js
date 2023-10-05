import React, { useState, useEffect } from 'react';
import './Pagination.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    return (
      <div className='pagination'>
        <button type="button" className="pageButton" onClick={() => onPageChange("prev")}>&lt;&lt;&lt;</button>
        <div className='my-auto mx-3'>{currentPage}/{totalPages}</div>
        <button type="button" className="pageButton" onClick={() => onPageChange("next")}>&gt;&gt;&gt;</button>
      </div>
    )
  }

export default Pagination
