declare module 'ml-knn' {
  class KDTree {
    constructor(points: any[][], metric: (a: any[], b: any[]) => number)
    nearest(
      point: any[],
      maxNodes: number,
      maxDistance: number | null
    ): Array<[any, number]>
    toJSON(): { root: KDTreeNode; dimensions: number[] }
  }

  class KDTreeNode {
    obj: any
    left: KDTreeNode | null
    right: KDTreeNode | null
    parent: KDTreeNode | null
    dimension: number
  }

  class KNN {
    constructor(
      dataset: any[][],
      labels: any[],
      options?: {
        k?: number
        distance?: (a: any[], b: any[]) => number
      }
    )
    predict(dataset: any[] | any[][]): any[] | any[][]
    toJSON(): {
      name: string
      kdTree: KDTreeNode
      k: number
      classes: any[]
      isEuclidean: boolean
    }
    load(model: unknown): KNN
  }

  const knn: KNN
  export = knn
}
