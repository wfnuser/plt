本文整理自 [Luca Cardelli, Type Systems](http://lucacardelli.name/papers/typesystems.pdf) 的第七章内容。欢迎 [star](https://github.com/wfnuser/plt) 和 [follow](https://github.com/wfnuser)。

# 等价性 (Equivalence)

为了便于讨论，我们此前跳过了一些类型断言。但是在一些复杂的类型系统中以及当需要捕捉程序的语义时这些断言仍然是必要的。我们在本节简要讨论一下。

**类型等价**(type equivalence)断言，形式为 $\Gamma \vdash A = B$，可在类型等价关系并不明显且需要精确描述时使用。例如，某些类型系统将递归类型与其展开视为等价。因此在这种情况下，我们有 $\Gamma \vdash μX.A = [μX.A/X]A$，只要 $\Gamma \vdash μX.A$。另一个例子是具有类型操作符 $λX.A$（从类型到类型的函数）的类型系统，具有以下形式归约规则： $\Gamma \vdash (λX.A) B = [A/X]B$ (编者: 这里是写错了吗🤔 不是 [X/B]A 吗？)。通常，类型等价断言在**重新赋型**(retyping)规则中使用，规定如果 $\Gamma \vdash M : A$ 且 $\Gamma \vdash A = B$，则 $\Gamma \vdash M : B$。

一个**项等价**(term equivalence)断言确定了哪些程序的类型是等价的。它具有形式 $\Gamma \vdash M = N : A$。通过适当的规则，我们可以确定 $\Gamma \vdash 2+1 = 3 : Int$。项等价断言可用于为程序提供带类型的语义：如果 $N$ 是一个不可约表达式(irreducible expression)，那么我们可以将 $N$ 的类型视为程序 $M$ 的类型。

##
![](https://github.com/wfnuser/wfnuser/raw/main/banner.jpg)