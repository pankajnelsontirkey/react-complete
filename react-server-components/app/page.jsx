import fs from 'node:fs/promises';
import { Suspense } from 'react';

// import ClientDemo from '@/components/ClientDemo';
// import DataFetchingDemo from '@/components/DataFetchingDemo';
// import RSCDemo from '@/components/RSCDemo';
// import ServerActionsDemo from '@/components/ServerActionsDemo';
import UsePromiseDemo from '@/components/UsePromisesDemo';

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8');
      const users = JSON.parse(data);
      resolve(users);
    }, 2000)
  );

  return (
    <main>
      {/* <p>Let's go!</p> */}
      {/* <RSCDemo />
      <ClientDemo>
        <RSCDemo />
      </ClientDemo> */}
      {/* <DataFetchingDemo /> */}
      {/* <ServerActionsDemo /> */}
      <Suspense fallback={<p>loading...</p>}>
        <UsePromiseDemo usersPromise={fetchUsersPromise} />
      </Suspense>
    </main>
  );
}
