function updateUI() {
  const locationCard = document.querySelector("location-card");
  locationCard.innerHTML = `
                        <h2>Лес</h2>
                        <p id="location-description">Вы стоите на центральной площади небольшой деревушки. Деревянные дома с
                            соломенными крышами выстроились вокруг мощёной камнем площади. В воздухе пахнет дымом из печей и
                            свежескошенной травой.
                        </p>
                        `;
console.log('HI from updateUI');

}

window.updateUI = updateUI;
