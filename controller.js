String.prototype.decodeHTML = function() {
    return this.replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/^\s+/mg, "")
        .replace("-", " -");

};

var sections = ['home', 'personalProjects', 'resumeTitle', 'contactMe'];
var sectionButtons = ['homeButton', 'projectButton', 'resumeButton', 'contactMeButton'];

var app = angular.module('LandingPage', ['ngMaterial', 'ngSanitize']);
app.controller('landingController', function($scope, $window) {

    $scope.scrollToId = function(id) {
        $window.scrollTo({
            top: document.getElementById(id).offsetTop,
            behavior: "smooth"
        });
    }

    $scope.showProject = function(project) {
        for (var i = 0; i < $scope.projects.length; i++) {
            $scope.projects[i].showFull = false;
            $scope.projects[i].show = false;
        }
        project.showFull = true;
        project.show = true;
    }

    $scope.showAllProjects = function() {
        for (var i = 0; i < $scope.projects.length; i++) {
            $scope.projects[i].showFull = false;
            $scope.projects[i].show = true;
        }
    }

    // get the project info
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./projects.xml", false);
    xhttp.send();
    var json = JSON.parse(xml2json(xhttp.responseXML, ""))
    $scope.projects = json.root.project;
    var project = $scope.projects[1];
    for (var i = 0; i < $scope.projects.length; i++) {
        var p = $scope.projects[i]
        if (p.description) {
            p.description = marked(p.description).decodeHTML();

        }
    }
    $scope.icons = ['home', 'folder', 'library_books', 'email'];
    $scope.sections = sections;
    $scope.sectionButtons = sectionButtons;
    $scope.range4 = [...Array(4).keys()];
});

window.onscroll = function() {

    var bScroll = window.scrollY + 300;
    for (var i = 0; i < sections.length; i++) {
        var section = document.getElementById(sections[i]);
        var section2 = document.getElementById(sections[i + 1]);
        var sectionButton = document.getElementById(sectionButtons[i]);

        if (section2)
            var sHeight = section2.offsetTop - section.offsetTop;
        else
            var sHeight = 300;

        var offsets = section.offsetTop;

        if (bScroll > offsets && bScroll < offsets + sHeight) {
            sectionButton.style.color = 'black';
            sectionButton.style.backgroundColor = 'white';

        } else {
            sectionButton.style.color = 'white';
            sectionButton.style.backgroundColor = 'transparent';
        }
    }
}

function resizeIframe(obj) {
    obj.style.height = (obj.contentWindow.document.body.scrollHeight + 100) + 'px';
}