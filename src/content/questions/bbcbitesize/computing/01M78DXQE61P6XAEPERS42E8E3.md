---
id: 01M78DXQE61P6XAEPERS42E8E3
subject: Computing
topics: ["Sequence, selection and repetition"]
choices:
  - id: A
    text: "\"Points\" twice, and hello is skipped"
  - id: B
    text: "Nothing, because a choice inside a repeat never runs"
  - id: C
    text: "\"Hello\" once only"
  - id: D
    text: "\"Hello\" twice, and \"points\" is not said"
correctChoiceIds: [D]
explanation: "The repeat says hello two times. The score is not greater than 0, so the points message is skipped both times."
---
Repeat 2 times: say hello, then, if the score is greater than 0, say "points." The score is 0. What is said?
