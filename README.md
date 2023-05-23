# README

- the live URL: https://askmybook.onrender.com/
- I bought the book (Kindle) and converted it to PDF so I could test it on real data (had to remove DRM 😇)

### PDF Import

Usage:

```bash
rake 'pdf:import[/path/to/the.pdf]'
```

## Rails notes

- I realize that the task explicitly says "local file with embeddings"
    - however, I've decided to use a database table with pgvector instead (with https://github.com/ankane/neighbor)
    - wanted to learn how to use pgvector and used this task as an excuse
    - not sure if that's considered cheating, though (the code is much simpler because of pgvector)
    - (I have never done anything with vector embeddings before and I'm not going to pretend I understand the math behind it)

- I've skipped tests, because I didn't have a lot of time for this task and a big part of the code is remote API calls, so the majority of the tests would be mocks/stubs
    - that said, I do write tests normally 😅 example: https://github.com/pch/rails-boilerplate

- tbh, I don't know what's the correct way to use react with rails - normally I'd use sth like Next.js + Rails API
    - I've picked client-only routing with react-router + a catch-all route in the rails router
    - the drawbacks are: client-only rendering, not handling 404 on invalid question IDs

- error handling (e.g. OpenAI API downtime) is not included in my code (I'd definitely spend more time on that)
- I've intentionally left debug messages (Rails.logger.ap)

- the Resemble API didn't work for me — sync requests were disabled for my account and enabling them requires to schedule a call
    - I could solve it with an async request, but that doesn't fit the use case (audio should be available immediately)
    - (I could also use another text2speech API...)
    - I left the code, though, so you can uncomment it in `FindOrCreateQuestion` and try it out

- the python code uses older embeddings models - I've replaced them with `davinci`, as suggested by the OpenAI docs

## React notes

- React is not my specialty: I can get things done and follow existing conventions, but I'm definitely not an expert
- I didn't focus too much on polishing the UI, so there are a few noticeable glitches
- for production-ready code I'd use TypeScript, but I didn't want to spend too much time on boilerplate here
