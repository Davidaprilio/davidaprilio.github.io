export const profile = {
    name: 'David',
    fullName: 'David Aprilio',
    title: 'Full-Stack Engineer',
    email: 'david1.aprilio4@gmail.com',
    location: 'Indonesia',
    timeZone: 'Asia/Jakarta',
    yearsExp: '4+',
    socials: {
        github: 'https://github.com/Davidaprilio',
        linkedin: 'https://www.linkedin.com/in/david-aprilio',
        instagram: 'https://instagram.com/david.arl_',
    },
    updateYear: 2026,
} as const;


export const stats = [
    { number: profile.yearsExp, label: 'Years Experience' },
    { number: '16+', label: 'Projects Completed' },
    { number: '2', label: 'Open Source Project' },
    { number: '∞', label: 'Cups of Coffee' },
] as const