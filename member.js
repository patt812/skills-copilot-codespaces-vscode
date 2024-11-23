function skillsMember() {
    var member = {
        name: 'John',
        age: 25,
        skills: ['js', 'html', 'css'],
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(this.name + ' knows ' + skill);
            });
        }
    };
    member.showSkills();
}