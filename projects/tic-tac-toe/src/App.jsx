import Player from './components/Player';

function App() {
  return (
    <>
      <main>
        <div id='game-container'>
          <ol id='players'>
            <Player defaultName={'Player 1'} symbol={'X'} />
            <Player defaultName={'Player 2'} symbol={'O'} />
          </ol>
          GAME BOARD
        </div>
      </main>{' '}
    </>
  );
}

export default App;
