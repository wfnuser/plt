本文整理自 [Luca Cardelli, Type Systems](http://lucacardelli.name/papers/typesystems.pdf) 的第二章内容。欢迎 [star](https://github.com/wfnuser/plt) 和 [follow](https://github.com/wfnuser)。

# 类型系统的语言

类型系统规定了编程语言的类型规则，而这是与特定类型检查算法无关的。  
因此，将类型系统与类型检查算法分开讨论是自然的：类型系统属于语言定义的范畴，而算法则属于编译器。通过类型系统而不是特定编译器使用的算法来解释语言的类型通常更为简单。并且，不同编译器对同一个类型系统也可能有不同的实现。  
仅有一个小问题，就是，技术上可以定义出的类型系统可能并没有可行的类型检查算法。（编者：应该是说过于复杂的类型系统可能没有办法实现高效的类型检查算法，因此实际上是不可用的）。

## 断言

本章我们会介绍如何形式化地描述类型系统。让我们从断言(judgments)的形式化描述开始。

一个典型的断言形式如下：
$$ \Gamma \vdash J $$

> $J$ 是断言，其中的自由变量在 $\Gamma$ 中定义。

我们称为 $\Gamma$ 蕴含 $J$。 这里的 $\Gamma$ 是一个静态类型环境(static typing environment)；比如，它可以是一系列不同的变量和对应的类型组成，形式化的描述为： $\phi,x_1:A_1,...,x_n:A_n$ 。 空的环境用 $\phi$ 表示， $\Gamma$ 中的变量中用 $dom(\Gamma)$ 表示，意为 $\Gamma$ 的域(domain)。

对于不同的断言来说 $J$ 的形式不同，但是 $J$ 中所有的变量都会被在 $\Gamma$ 中声明。
对于本章而言，最重要的一个断言是类型断言(typing judgment)，即用于声明 $M$ 在静态类型环境中拥有 $A$ 类型。其形式如下：
$$\Gamma \vdash M : A$$

> $M$在环境$Gamma$中拥有$A$类型。

示例：
$\phi \vdash true : Bool$

> $true$ 拥有 $Bool$ 类型。

$\phi, x:Nat \vdash x+1: Nat$

> 如果 $x$ 是一个自然数，则 $x+1$ 也是一个自然数。

其他的断言通常也是必要的。比如有一个常见的断言用于表示环境是构造良好(well formed)的，如下：
$$\Gamma \vdash \lozenge$$

> $Gamma$ 是构造良好的。

每一个断言要么是有效的（如： $\Gamma \vdash true : Bool$ ），要么是无效的（如： $\Gamma \vdash true : Nat$ ）。有效性形式化地描述了构造良好的概念。有效和无效断言之间的区别有若干种不同的方式表示，而现在有一种程式化的描述方式占据了主流。这种建立在类型规则(type rules)之上的表述方式，有助于陈述和证明关于类型系统的技术性引理和定理。此外，类型规则具有高度的模块化特点：不同构造的规则可以分别编写（与单一的类型检查算法相比）。因此，类型规则相对容易阅读和理解。

## 类型规则(Type rules)

类型规则可以通过其他有效断言来判断某一断言的有效性。整个推导过程会从一些被确定为有效的断言开始（通常情况是从良好构造的空环境开始， $\phi \vdash \lozenge$）。

类型规则的一般形式如下：

$$
\frac
  {\Gamma_1 \vdash J_1 \quad \Gamma_2 \vdash J_2 \quad \ldots \quad \Gamma_n \vdash J_n}
  {\Gamma_1\vdash J}
$$

每条规则都写成若干个横线上的前提断言和横线下的唯一的结论断言。如果所有的前提都满足，则结论一定成立；类型规则可以没有前提。每条规则都有一个名字（按照惯例，名称的第一个单词由结论断言决定；例如，形式为“(Val ... )”的规则名称用于其结论为值类型断言的规则）。在需要时，限制规则适用性的条件，以及规则内部使用的缩写，都会注释在规则名称或前提旁边。

例如，以下两个规则中的第一个规则说明任何数字都是类型为 $Nat$ 的表达式，可以出现在任何良构的环境 $\Gamma$ 中。第二个规则说明两个表示自然数的表达式 $M$ 和 $N$ 可以组合成更大的表达式 $M+N$，该表达式也表示自然数。此外，表达式 $M$ 和 $N$ 的环境 $\Gamma$ ，声明了 $M$ 和 $N$ 的任何自由变量的类型，也适用于 $M+N$。

$$
\begin{aligned}
& (Val\ n) \quad (n = 0, 1, \ldots) \\
& \frac
  {\Gamma \vdash \lozenge}
  {\Gamma \vdash n: Nat}
\end{aligned}
$$

$$
\begin{aligned}
& (Val\ +) \\
& \frac
  {\Gamma \vdash M : Nat    \Gamma \vdash N : Nat }
  {\Gamma\vdash M+N: Nat}
\end{aligned}
$$

有一条基础的规则是空环境是良构的，不需要任何前提：

$$
\begin{aligned}
& (Env \; \phi) \\
& \frac
  {}
  {\phi \ \vdash \ \lozenge}
\end{aligned}
$$

一组类型规则称为形式化的类型系统(formal type system)。从技术上讲，类型系统适应于形式化证明系统(formal proof systems)的一般框架：用于逐步推导的规则集合。在类型系统中进行的推导涉及程序的类型。

## 类型推导(Type derivations)

在给定的类型系统中，推导(derivation)是一颗断言的树，树的叶子位于顶部，根位于底部，其中每个断言是通过该系统的某个规则从位于其上方的断言获得的。对于类型系统的一个基本要求是必须能够检查导出是否构造正确。

有效的断言是可以在给定类型系统中的推导的根据。换句话说，有效的断言是可以通过正确应用类型规则获得的断言。例如，使用前面给出的三条规则，我们可以构建以下导出，从而证明了 $\phi \vdash 1+2:Nat$ 是有效的断言。在每一步应用的规则显示在每个结论的右侧：

$$
\begin{align*}
&\begin{aligned}
&\overline{\phi \vdash \lozenge} & \ by \ (Env\ \phi) & \quad \overline{\phi \vdash \lozenge} &  \\
&\overline{\phi \vdash 1: Nat} & \ by \ (Val\ n) & \quad \overline{\phi \vdash 2 : Nat} &
\end{aligned}
\\
&\overline{\quad\quad\quad\quad\quad\quad \phi \vdash 1+2: Nat \quad\quad\quad\quad\quad\quad}
\end{align*}
\begin{aligned}
& by (Env\ \phi) \\
& by (Val\ n)\\
& by(Val\ +)
\end{aligned}
$$

## 类型良好和类型推断(Well typing and type inference)
在给定的类型系统中，如果存在一种类型 $A$，使得 $\Gamma \vdash M : A$ 是有效的断言，即项 $M$ 可以被赋予某种类型，那么对于环境 $\Gamma$ 来说项 $M$ 是良类型的。

对于一个项的推导（以及类型的推导），被称为类型推断问题。在由规则 $(Env\ \phi)$、$(Val\ n)$ 和 $(Val\ +)$ 组成的简单类型系统中，在空环境中可以推导出项 $1+2$ 的类型是 $Nat$。

现在假设我们添加了一个带有前提 $\Gamma \vdash \lozenge$ 和结论 $\Gamma \vdash true : Bool$ 的类型规则。在这个新的类型系统中，我们无法为项 1+true 推断任何类型，因为没有规则可以将自然数与布尔值相加。由于对于 1+true 没有任何推导，我们说 1+true 无法被赋予类型，或者说它是不良类型，或者说它存在类型错误(typing error)。

我们可以进一步添加一个带有前提 $\Gamma \vdash M : Nat$ 和 $\Gamma \vdash N : Bool$ 以及结论 $\Gamma \vdash M+N : Nat$ 的类型规则（例如，将 $true$ 解释为 $1$）。在这种类型系统中，可以为项 $1+true$ 推断一种类型，现在它是良类型的。

因此，对于给定项的类型推断问题对于所讨论的类型系统非常敏感。针对不同类型系统的类型推断算法复杂度迥异，有的系统甚至无法设计出可行的算法。

对于显式类型的过程性语言（例如 Pascal）的类型推断问题相对容易解决；我们将在第 8 节中讨论它。对于隐式类型的语言，如 ML，类型推断问题要复杂得多，我们在本书中不讨论它。基本算法是众所周知的（文献中有几种描述），并且被广泛使用。但是，实际中使用的算法版本通常较复杂，仍在研究中。

在存在多态性(polymorphism)的情况下，类型推断问题变得特别困难（在第 5 节讨论多态性）。对于 Ada、CLU 和 Standard ML 等显式类型多态功能的类型推断问题在实践中是可处理的。然而，这些问题通常是通过算法来解决的，而不是首先描述相关的类型系统。最通用的多态性的类型系统由 λ-演算表示，它的类型推断算法相对容易，我们将在第 8 节中介绍它。然而，解决方案的简洁性依赖于不实用的冗长类型注释。为了使这种通用多态性变得实用，必须省略一些类型信息。这种类型推断问题仍然是活跃研究的领域。

## 类型健壮性(Type soundness)
我们现在已经了解了有关类型系统的基本概念，可以开始研究具体的类型系统了。从第3节开始，我们将回顾一些非常强大但较为理论化的类型系统。通过了解这几个经典的系统，可以更容易地编写用于实现编程语言各种复杂特性的类型规则。

当我们深入研究类型规则时，应该意识到一个合理的类型系统不仅仅是一组任意的规则集合。良好的类型应该对应于良好程序行为的语义概念。通过证明类型系统健壮来保障类型系统的内在一致性是一种常见的做法，这就是类型系统与语义相结合的地方。对于指称语义(denotational semantics)，如果 $\Gamma \vdash M : A$ 是有效的，那么 $[\![a]\!] \in [\![A]\!]$ 成立（M的值属于类型A表示的值的集合），而对于操作语义（operational semantics），如果 $\Gamma \vdash M : A$ 并且$M$可以规约到$M'$，那么 $\Gamma \vdash M’ : A$。在这两种情况下，类型的健壮性定理(type soundness theorem)保证了类型良好的程序在计算时不会出现执行错误。参见[11, 34]以了解有关技术的概述，以及最新的健壮性证明方法。

## 参考
[11] Gunter, C.A., Semantics of programming languages: structures and techniques. Foundations of computing, M. Garey and A. Meyer ed. MIT Press. 1992.  
[34] Wright, A.K. and M. Felleisen, A syntactic approach to type soundness. Information and Computation 115(1), 38-94. 1994.

##
![](https://github.com/wfnuser/wfnuser/raw/main/banner.jpg)
