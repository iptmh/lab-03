'use strict';

function Animal(animal) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];

Animal.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');

  let animalHtml = $('#photo-template').html();

  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url).attr('data-flavor', this.keyword);
  animalClone.find('p').text(this.description);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.title + ' animal');
  animalClone.attr('data-flavor', this.keyword);
};

Animal.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Animal.allAnimals.push(new Animal(item));
      });
    })
    .then(Animal.loadAnimals)
};

Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => animal.render());
};

$(() => Animal.readJson());

$('select[name="animals"]').on('change', function () {
  let $selection = $(this).val();
  $('div.animal').hide();
  $(`div[data-flavor="${$selection}"]`).show();
});

