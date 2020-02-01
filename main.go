//dev server - not used in production
package main

import (
  "github.com/labstack/echo"
)

func main() {
  e := echo.New()
  e.Static("/", ".")
  e.Start(":8080")
}
