package helpers

import "strings"

func GetLastElementSplitBy(element, character string) string {
	slice := strings.Split(element, character)
	return slice[len(slice)-1]
}
