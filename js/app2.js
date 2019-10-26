'use strict';

function Animal(animal) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];

// Animal.dropdown = [];
Animal.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');

  // if (!Animal.dropdown.includes(this.keyword)) {
  //   Animal.dropdown.push(this.keyword);
  // }

  // let filterClone = $('option[class="keyword-clone"]');

  // filterClone.text(this.keyword);
  // filterClone.removeClass('keyword-clone');
  // filterClone.attr('class', this.keyword);

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
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Animal.allAnimals.push(new Animal(item));
      });
    })
    .then(Animal.loadAnimals)
  // .then(console.log(Animal.dropdown[1]));
  // .then(Animal.dropdown.forEach(function (element) {
  //   console.log('dropdown load', element);
  //   $('select').append(`<option class="keyword">${element}</option>`);
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

