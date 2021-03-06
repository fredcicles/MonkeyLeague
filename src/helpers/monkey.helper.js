import { 
    FieldPositionPerks, 
    FieldPositionNames, 
    TraitNames,
    MAX_PERKS_STRIKER,
    MAX_PERKS_MIDFIELDER,
    MAX_PERKS_DEFENDER,
    MAX_PERKS_GOALKEEPER,
    MAX_STATS
    } from '../constants/monkey.constants'
import { descendingComparator } from './sorting.helpers'

const getTraitValue = (monkey, traitName) => {
    const value = monkey.attributes.find(attribute => attribute.trait_type === traitName).value
    return value
}

const getFieldPositionMaxPotential = (monkey, fieldPosition, perks) => {
    const score = FieldPositionPerks
        .find(position => position.FieldPosition === fieldPosition)
        .Skills
        .reduce((score, skill) => {
            const skillScore = Number(getTraitValue(monkey, skill.Name))
            return score += (skillScore * skill.Weight)
        }, 0)
    return score * perks
}

/*
const getFieldPositionMaxPotential_OLD = (monkey, fieldPosition) => {
    const score = FieldPositionPerks
        .find(position => position.FieldPosition === fieldPosition)
        .Skills
        .reduce((score, skill) => {
            const skillScore = Number(getTraitValue(monkey, skill.Name))
            return score += (skillScore * skill.Weight)
        }, 0)
    return score
}
*/

const getFieldPositionPerksTotal = (monkey, fieldPosition) => {
    const score = FieldPositionPerks
        .find(position => position.FieldPosition === fieldPosition)
        .Perks
        .reduce((score, perk) => {
            return score += Number(getTraitValue(monkey, perk))
        }, 0)
    return score
}

const calculateMaxPotential = (striker, midfielder, defender, goalkeeper) => {
    const array = [
        {
            name: 'Striker',
            value: striker
        },
        {
            name: 'Midfielder',
            value: midfielder
        },
        {
            name: 'Defender',
            value: defender
        },
        {
            name: 'Goalkeeper',
            value: goalkeeper
        }
    ]

    array.sort((a, b) => descendingComparator(a, b, 'value'))

    return array[0].name
}


// Perform any data transformation here
export const transformRawMonkeysData = monkeys => monkeys.map(transformRawMonkeyData)


// Perform any data transformation here
export const transformRawMonkeyData = monkey => {
    const accuracy = Number(getTraitValue(monkey, TraitNames.Accuracy))
    const control = Number(getTraitValue(monkey, TraitNames.Control))
    const defense = Number(getTraitValue(monkey, TraitNames.Defense))
    const passing = Number(getTraitValue(monkey, TraitNames.Passing))

    const maxAccuracy = Number(getTraitValue(monkey, TraitNames.MaxAccuracy))
    const maxControl = Number(getTraitValue(monkey, TraitNames.MaxControl))
    const maxDefense = Number(getTraitValue(monkey, TraitNames.MaxDefense))
    const maxPassing = Number(getTraitValue(monkey, TraitNames.MaxPassing))
    const maxTotalSkills = maxAccuracy + maxControl + maxDefense + maxPassing

    const strikerPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Striker)
    const strikerPerksScore = strikerPerks / MAX_PERKS_STRIKER
    const midfielderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Midfielder)
    const midfielderPerksScore = midfielderPerks / MAX_PERKS_MIDFIELDER
    const defenderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Defender)
    const defenderPerksScore = defenderPerks / MAX_PERKS_DEFENDER
    const goalkeeperPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Goalkeeper)
    const goalkeeperPerksScore = goalkeeperPerks / MAX_PERKS_GOALKEEPER

    const strikerMaxPotential = getFieldPositionMaxPotential(monkey, FieldPositionNames.Striker, strikerPerks)
    const midfielderMaxPotential = getFieldPositionMaxPotential(monkey, FieldPositionNames.Midfielder, midfielderPerks)
    const defenderMaxPotential = getFieldPositionMaxPotential(monkey, FieldPositionNames.Defender, defenderPerks)
    const goalkeeperMaxPotential = getFieldPositionMaxPotential(monkey, FieldPositionNames.Goalkeeper, goalkeeperPerks)

    return {
        name: getTraitValue(monkey, TraitNames.Name),
        id: getTraitValue(monkey, TraitNames.ID),
        price: monkey.price,
        link: `https://magiceden.io/item-details/${monkey.mintAddress}`,
        alphaScore: getTraitValue(monkey, TraitNames.AlphaScore),

        accuracy,
        maxAccuracy,
        control,
        maxControl,
        defense,
        maxDefense,
        passing,
        maxPassing,
        totalSkills: accuracy + passing + defense + control,
        maxTotalSkills,
        maxTotalSkillsPercentage: maxTotalSkills / MAX_STATS,

        strikerMaxPotential: strikerMaxPotential,
        strikerPerks: strikerPerks,
        strikerPerksScore: strikerPerksScore,

        midfielderMaxPotential: midfielderMaxPotential,
        midfielderPerks: midfielderPerks,
        midfielderPerksScore: midfielderPerksScore,

        defenderMaxPotential: defenderMaxPotential,
        defenderPerks: defenderPerks,
        defenderPerksScore: defenderPerksScore,

        goalkeeperMaxPotential: goalkeeperMaxPotential,
        goalkeeperPerks: goalkeeperPerks,
        goalkeeperPerksScore: goalkeeperPerksScore,

        totalPerks: strikerPerks + midfielderPerks + defenderPerks + goalkeeperPerks,
        totalPerksScore: (strikerPerksScore + midfielderPerksScore + defenderPerksScore + goalkeeperPerksScore) / 4,

        maxPotential: calculateMaxPotential(strikerMaxPotential, midfielderMaxPotential, defenderMaxPotential, goalkeeperMaxPotential)
    }
}
