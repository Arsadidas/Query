import React from 'react';

interface P {
    paginate: (a: number) => void
    countryPerPage: number
    totalTodos: number
}

const Pagination: React.FC<P> = ({paginate, countryPerPage, totalTodos}) => {

    const pageNumbers: number[] = []
    for (let i = 1; i <= Math.ceil(totalTodos / countryPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className='pagination'>
            {pageNumbers.map((number) => (
                <li className='page-item' key={number}>
                    <a onClick={() => paginate(number)} href='!#' className="page-link">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;