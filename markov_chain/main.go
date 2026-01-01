package main

import (
	"fmt"
	"math"
	"math/rand/v2"
	"time"
)

const (
	N     = 1500
	ITER  = 300
	L     = 60
	Green = rune(0x1F7E2)
	Black = rune(0x26AB)
)

var (
	pGG = 0.47
	pBG = 0.25

	gen *rand.Rand
)

func init() {
	gen = rand.New(rand.NewPCG(1984, uint64(time.Now().Unix())))
}

func main() {
	var p, s, sk, disp float64
	out := true
	for range ITER {
		p = iteration(out)
		out = false

		s += p
		sk += p * p
	}

	disp = sk/float64(ITER) - float64(s*s)/float64(ITER*ITER)
	disp = ITER * disp / float64(ITER-1)

	fmt.Printf("\nP(G \u2192 G) = %f\n", pGG)
	fmt.Printf("P(B \u2192 G) = %f\n-------------------\n", pBG)
	fmt.Printf("P(G) exp:   %f \u00B1 %f\n", s/float64(ITER), math.Sqrt(disp))
	fmt.Printf("P(G) exact: %f\n", pBG/(pBG+1.0-pGG))
}

func iteration(out bool) float64 {
	var is_green, current bool
	if gen.Float64() > 0.5 {
		current = true
	} else {
		current = false
	}

	var cnt int = 0
	for i := 1; i <= N; i++ {
		if current {
			if gen.Float64() > pGG {
				is_green = false
			} else {
				is_green = true
			}
		} else {
			if gen.Float64() > pBG {
				is_green = false
			} else {
				is_green = true
			}
		}

		if is_green {
			cnt += 1
		}

		if out {
			if is_green {
				fmt.Print(string(Green))
			} else {
				fmt.Print(string(Black))
			}

			if i%L == 0 {
				fmt.Println("")
			}
		}

		current = is_green
	}

	return float64(cnt) / float64(N)
}
