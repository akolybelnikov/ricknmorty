package helpers

import (
	"fmt"
	"strings"
)

func GetLastElementSplitBy(element, character string) string {
	slice := strings.Split(element, character)
	return slice[len(slice)-1]
}

func SliceIntToString(slice []int, join string) string {
	return strings.Trim(strings.Join(strings.Fields(fmt.Sprint(slice)), join), "[]")
}
