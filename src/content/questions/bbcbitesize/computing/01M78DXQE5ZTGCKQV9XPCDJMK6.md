---
id: 01M78DXQE5ZTGCKQV9XPCDJMK6
subject: Computing
topics: ["Debugging and logical reasoning"]
choices:
  - id: A
    text: "The bug must be in the title screen, which they have not opened"
  - id: B
    text: "The coin instructions are missing a change to the score"
  - id: C
    text: "The sound is an input device"
  - id: D
    text: "A score is not allowed to change"
correctChoiceIds: [B]
explanation: "The coin does what its instructions say: it plays a sound and leaves the score alone. The score change is missing there."
---
Collecting a coin plays a sound, but the score stays at 0. The coin instructions do not change the score. Where is the bug?
