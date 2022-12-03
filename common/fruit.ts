export interface Fruit {
  auth0Id: string
  name: string
  averageGramsEach: number
}

export interface FruitRequest {
  fruit: Fruit
}

export interface FruitResponse {
  fruits: Fruit[]
}
