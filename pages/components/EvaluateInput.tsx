import { SearchIcon } from '@heroicons/react/solid'
import { FC } from 'react'

export const EvaluateInput: FC<{ pathToEvaluate: any, setPathToEvaluate: any }> = ({ pathToEvaluate, setPathToEvaluate }) => {
  return (
    <div>
      <label htmlFor="pathToEvaluate" className="block text-sm font-medium text-gray-700">
        Ingrese la camino a evaluar, con los nombres de los vértices separados por comas
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input type="text" name="pathToEvaluate" id="pathToEvaluate" value={pathToEvaluate} onChange={(e) => setPathToEvaluate(e.target.value)}
            className="px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="a,b,y,h,c"
          />
        </div>
        <button type='submit' className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
