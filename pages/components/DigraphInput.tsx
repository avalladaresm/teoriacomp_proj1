import { SearchIcon } from '@heroicons/react/solid'
import { FC } from 'react'

export const DigraphInput: FC<{ digraph: any, setDigraph: any }> = ({ digraph, setDigraph }) => {
  return (
    <div>
      <label htmlFor="digraph" className="block text-sm font-medium text-gray-700">
        Ingrese una cadena para crear el gráfico, debe estar en formato '{'a->b;c->d;'}'
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input type="text" name="digraph" id="digraph" value={digraph} onChange={(e) => setDigraph(e.target.value)}
            className="px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="a->b;c->d;"
          />
        </div>
        <button type='submit' className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
