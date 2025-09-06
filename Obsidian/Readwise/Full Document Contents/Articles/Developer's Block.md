# [[Readwise/Articles/Developer's Block|Developer's Block]]

![rw-book-cover](https://news.ycombinator.com/y18.svg)
#software-development
## Metadata
- Author: [[Hacker News]]
- Full Title: [[Readwise/Articles/Developer's Block|Developer's Block]]
- Category: #articles
- Document Note: This will be very useful
- Summary: [[Readwise/Articles/Developer's Block|Developer's block]] happens when coding feels stuck, either starting a new project or working on an existing one. It can be caused by trying to do too much at once, feeling overwhelmed, or losing motivation. To get unblocked, take small steps, learn gradually, avoid over-optimizing early, and release your work often.
- URL: https://underlap.org/developers-block/

## Full Document
Writer’s block is the paralysis induced by a blank page, but software developers experience a similar block and it can even get worse over time. Sometimes a good analogy is that your wheels are spinning and you need to gain traction.

Let’s look at the different kinds of developer’s block, what causes them, and how to get unblocked.

#### A new project and it’s going to be your best ever#

You want to write great code. In fact, most developers want each of their coding projects to be their best ever. That means different thing to different people, but if you apply all of the following practices from the start, you’ll soon get blocked.

Once you buy into the benefits of testing, you’ll want to include decent unit and integration test suits in your code. Of course, at least in the longer term, a decent test suite helps maintain velocity. Right? You might also want to include some fuzz testing, to exercise edge cases you haven’t thought of.

When you’ve realised how useful good documentation is, you’ll want a good README or user guide and probably some other documentation on how to contribute to or maintain the code. You might want to document community standards too, just in case.

Then there are specific coding practices that you have learned such as good naming, modularity, and the creation and use of reusable libraries. You’ll want to stick to those, even if they need a bit more effort up front.

You may have favourite programming languages that will influence your choice of language and tooling, regardless of what would actually make the job in hand easier to complete. For example, if you’re working on open source, you may prefer an open source programming language, build tools, and editor or IDE.

Then you will probably want to use version control and write good commit logs. How could you not? You’ll then want to set up CI to run the test suite automatically.

You may want to set up cross-compilation so you can support multiple operating systems.

You may want to stick to a standard coding style and enforce that with automation in your preferred editor or IDE and maybe a check in CI.

You’ll want a consistent error-handling approach and decent diagnostics so it’s easy to debug the code.

If the code involves concurrency, you’ll want to put in extra effort to make sure your code is free from data races, deadlocks, and livelocks.

All these practices are valuable, but sometimes they just mount up until you’re blocked.

#### An existing project and you’ve lost traction#

Another kind of developer’s block occurs later on in a project. Either you are new to the project and you just feel overwhelmed or you’ve been working on the project for a while, but you run out of stream and get stuck.

The causes in these two cases are different. Feeling overwhelmed is often due to trying to rush the process of gaining understanding. Nobody comes to a new codebase and instantly understands it. Another issue with a new codebase is unfamiliarity with the implementation language or the conventions in the way the language is used.

Running out of steam may be due to overwork or a lack of motivation.

#### How to get unblocked?#

##### Take time with learning#

You have to find a way in. Sometimes trying the code out as a user gives you a better idea of what it’s all about. Sometimes you need to read the docs or tests to get an idea of the externals. Eventually, you can start looking at the source code and building up a mental model of how it all fits together to achieve its purpose.

If there are other people working on the project, don’t be afraid to ask questions.[[1]](https://underlap.org/developers-block/#fn1) Sometimes a newcomer’s naive questions help others to understand something they took for granted.

If you’re new to the implementation language of a project, take some time to learn the basics. Maybe you’re fluent in another language, but that doesn’t mean you can instantly pick up a new language. When you come across a confusing language feature, take the opportunity to go and learn about the feature.

Remember the dictum “If you think education is expensive, try ignorance”.

##### Realise when you’re tired#

It’s important to take regular breaks and holidays, but sometimes you’re mentally exhausted after finishing one or more major features.

This is the time to take stock and ease off a little. Perhaps do some small tasks, sometimes known as “chores”, which are less mentally taxing, but nevertheless worthwhile. Maybe take time to pay off some technical debt.

##### Work incrementally#

Pick a small feature or bug and implement it with the minimum effort. Circle back round to improve the tests, docs, etc.

Rather than implementing all your best practices at the start of a project, see if there are some which can wait a while until you’ve gained some traction.

##### Write a prototype#

Sometime you need to do a quick prototype, sometimes called a “spike”, in which case just hack together something that just about solves the problem. Concern yourself only with the happy path. Write just enough tests to help you gain traction.

Then keep the prototype on a branch and circle back round and implement the thing properly with decent tests and docs. It’s ok to refer to the prototype to remind yourself how you did some things,[[2]](https://underlap.org/developers-block/#fn2) but don’t copy the code wholesale, otherwise you’ll be repaying the technical debt for ages.

If you’re trying to learn about a dependency, it’s sometimes easier to write a quick prototype of using the dependency, possibly in an empty repository, or even not under version control at all if it’s really quick.

##### Start with draft documentation#

Don’t polish your docs prematurely. Keep the format simple and check it in alongside the code. Capture *why* you did things a particular way. Provide *basic* usage instructions, but don’t do too much polishing until you start to gain users.

##### Avoid premature optimisation#

I think Michael A. Jackson summed this up best:

>  Rules of Optimization:
> 
>  Rule 1: Don’t do it.
> 
>  Rule 2 (for experts only): Don’t do it yet.
> 
>  

So don’t optimise unless there is a genuine problem - most code performs perfectly well if you write it so a human being can understand it. If you write it that way, you have some chance of being able to optimise it if you need to. In that case, do some profiling to find out where the bottlenecks are and then attack the worst bottleneck first. After any significant changes and if the problem still remains, re-do the profiling.

##### Release early, release often#

The code might be a little half-baked, with known issues (hopefully in an issue tracker), but don’t let this hold you back from releasing. This will give you a better feeling of progress. You could even get valuable early feedback from users or other developers.

##### Choose which yaks to shave#

You may be held up by a problem in a dependency such as poor documentation. It is tempting to start filling in the missing docs, but try to resist that temptation. Better to make minimal personal notes for now and, after you’ve made good progress, considering scheduling time to contribute some docs to the dependency.

Similarly, if your tooling doesn’t work quite right, just try to get something that works even if it involves workarounds or missing out on some function. Fixing tooling can be another time sink you can do without.

#### What about you?#

Are you prone to developer’s block? If so, what are your tips for getting unblocked? I’d love to hear about them.

* ← Previous  
 [Software convergence](https://underlap.org/software-convergence/)
