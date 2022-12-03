export interface Fruit {
  id: number
  name: string
  averageGramsEach: number
}

export interface FruitRequest {
  fruit: Fruit
}

export interface FruitResponse {
  fruits: Fruit[]
}
