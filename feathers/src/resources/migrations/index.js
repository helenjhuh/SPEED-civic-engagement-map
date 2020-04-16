// First we need to initalize the feathers client
import feathers, { services } from '../feathers';
import faker from 'faker';
import { randomFromArray, shuffleArray, randomBetween } from '../../helpers';

// Project types
const projectTypes = [
    'Engaged Teaching',
    'Engaged Research',
    'Engaged Projects',
    'Other'
];

const projectIssues = [
    'Arts, Media, and Culture',
    'Economic Development',
    'Education and Access',
    'Environment and Sustainability',
    'Ethics and Human Rights',
    'Identities and Inequality',
    'Public Health',
    'Politics and Public Policy',
    'Refugees and Immigration',
    'Science and Society'
];

const projectGrants = [
    'Chester Community Fellowship',
    'Lang Opportunity Scholarship',
    'Project Pericles Fund',
    'Summer Grants ( projects, internships, research )',
    'Faculty Award'
];

const randomLat = () => {
    let r = Math.floor(Math.random() * 180) + 1 
    r *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return r;
}

const randomLng = () => {
    let r = Math.floor(Math.random() * 90) + 1 
    r *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return r;
}

/**
 * @returns {} Returns a fake address that can be ingested into the feathers
 * address service.
 */
const fakeAddress = () => ({
    street1: faker.address.streetAddress(),
    city: faker.address.city(),
    region: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    lat: randomLat(),
    lng: randomLng()
});

/**
 * @param {string} addressId 
 * @returns {} Returns a fake user that can be ingested into the feathers
 * user service.
 */
const fakeUser = () => ({
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    email: faker.internet.email(),
    college: faker.internet.domainName() + ' university', 
    password: faker.internet.password(16)
});


/**
 * @param {string} ownerid
 * @param {string} addressid 
 * @param [string] pinids
 * @param [string] photoids
 * @returns {} Returns a fake project that can be ingested into the feathers
 * project service.
 */
const fakeProject = (ownerid, addressid, pinids = null, photoids = null) => {

    const isVerifiedAndFeatured = Math.random() >= 0.5;

    const project = {
        verified: isVerifiedAndFeatured, 
        featured: isVerifiedAndFeatured,
        name: faker.hacker.phrase(),
        description: faker.lorem.paragraph(4),
        types: shuffleArray(projectTypes).slice(0, randomBetween(1, projectTypes.length)),
        issues: shuffleArray(projectIssues).slice(0, randomBetween(1, projectIssues.length)),
        langGrants: shuffleArray(projectGrants).slice(0, randomBetween(1, projectGrants.length)),
        communityPartners: [undefined],
        funders: [undefined],
        beneficiaries: randomBetween(0, 20),
        website: `https://${faker.internet.domainName()}`,
        owner: ownerid,
        address: addressid,
    };

    if (pinids) {
        project.pinids = pinids;
    }

    if (photoids) {
        project.photos = photoids;
    }

    return project;
};

export { fakeProject, fakeAddress, fakeUser }; 

