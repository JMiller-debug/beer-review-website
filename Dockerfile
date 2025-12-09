FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm cache delete
RUN pnpm i

COPY . /app/
COPY next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["pnpm", "run", "dev"]