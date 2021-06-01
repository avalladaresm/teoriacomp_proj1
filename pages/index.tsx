import dynamic from 'next/dynamic'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import { Alert } from './components/Alert';
import { DigraphInput } from './components/DigraphInput';
import { EvaluateInput } from './components/EvaluateInput';
const Graphviz = dynamic(() => import('graphviz-react'), { ssr: false });

interface Path {
  origin: string
  target: string
}

const Home = () => {
  const [_pathToEvaluate, _setPathToEvaluate] = useState<string>('')
  const [_pathEvaluated, _setPathEvaluated] = useState<string>('')
  const [_pathsFound, _setPathsFound] = useState<number>(0)
  const [_filteredPaths, _setFilteredPaths] = useState<any>([])
  const [_isSubmitted, _setIsSubmitted] = useState<boolean>(false)
  const [_verticesCount, _setVerticesCount] = useState<number>(0)
  const [_digraph, _setDigraph] = useState<string>('')
  const [_submittedDigraph, _setSubmittedDigraph] = useState<string>()


  const digraph = 'a->b;a->i;i->j;c;d->c;a->d;d->e;d->f;f->g;g->e;g->h;f->a;g->d;'
  const activeDigraph = _submittedDigraph ?? digraph
  const edges = activeDigraph.split(';').filter(p => p.length > 0 && p.includes('->'))

  const paths: Path[] = edges.map(e => {
    const tempPath = e.split('->')
    return { origin: tempPath[0], target: tempPath[1] }
  })

  let filtered: Path[] = []

  const dot = `digraph {
   ${activeDigraph}
  }`;

  const onSubmit = () => {
    window.event?.preventDefault()
    _setIsSubmitted(true)
    _setPathsFound(0)
    _setPathEvaluated(_pathToEvaluate)
    const vertices = _pathToEvaluate.split(',')
    _setVerticesCount(vertices.length)
    paths.map((p, i) => {
      vertices.forEach((vertex, j) => {
        if (p.origin === vertices[j] && p.target === vertices[j + 1]) {
          filtered.push(p)
        }
      });
    })

    filtered.map((f, i) => {
      vertices.forEach((vertex, j) => {
        if (f.origin === vertices[j] && f.target === vertices[j + 1]) {
          _setPathsFound(prevValue => prevValue + 1)
        }
      });
    })
    _setFilteredPaths(filtered)
  }

  const onSubmitDigraph = () => {
    window.event?.preventDefault()
    _setSubmittedDigraph(_digraph)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className='my-5'>
          <form onSubmit={onSubmitDigraph}>
            <DigraphInput digraph={_digraph} setDigraph={_setDigraph} />
          </form>
        </div>
        <div className='my-5'>
          <form onSubmit={onSubmit}>
            <EvaluateInput pathToEvaluate={_pathToEvaluate} setPathToEvaluate={_setPathToEvaluate} />
          </form>
        </div>
        {_filteredPaths.length > 0 ? <div>
          <Alert
            type={(_pathsFound === _filteredPaths.length && _filteredPaths.length === _verticesCount - 1) ? 'success' : 'danger'}
            text={(_pathsFound === _filteredPaths.length && _filteredPaths.length === _verticesCount - 1) ? `Camino "${_pathEvaluated}" válido` : `Camino "${_pathEvaluated}" no válido`}
          />
        </div> : _isSubmitted && <div>
          <Alert
            type={'danger'}
            text={`Camino ${_pathEvaluated} no válido`}
          />
        </div>}
        <Graphviz dot={dot} />
        {JSON.stringify(edges)}
        <div className='text-2xl'>
          Grado del grafo: {edges.length * 2}
        </div>
      </main>
    </div>
  )
}

export default Home