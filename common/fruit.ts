export interface Fruit {
  name: string
  averageGramsEach: number
}

export interface FruitRequest {
  fruit: Fruit
}

export interface FruitResponse {
  fruits: Fruit[]
}
