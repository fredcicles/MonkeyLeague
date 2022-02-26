import { FieldPositionPerks, FieldPositionNames, TraitNames } from '../constants/monkey.constants'
import { descendingComparator } from './sorting.helpers'

const MAX_PERKS_STRIKER = 0.63
const MAX_PERKS_MIDFIELDER = 0.60
const MAX_PERKS_DEFENDER = 0.59
const MAX_PERKS_GOALKEEPER = 0.58
const MAX_STATS = 400

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
    const totalMaxPotential =
        Number(getTraitValue(monkey, TraitNames.MaxAccuracy)) +
        Number(getTraitValue(monkey, TraitNames.MaxPassing)) +
        Number(getTraitValue(monkey, TraitNames.MaxDefense)) +
        Number(getTraitValue(monkey, TraitNames.MaxControl))

    const strikerPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Striker)
    const midfielderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Midfielder)
    const defenderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Defender)
    const goalkeeperPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Goalkeeper)

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
        maxAccuracy: getTraitValue(monkey, TraitNames.MaxAccuracy),
        maxPassing: getTraitValue(monkey, TraitNames.MaxPassing),
        maxDefense: getTraitValue(monkey, TraitNames.MaxDefense),
        maxControl: getTraitValue(monkey, TraitNames.MaxControl),

        strikerMaxPotential: strikerMaxPotential,
        strikerPerks: strikerPerks,
        strikerPerksScore: strikerPerks / MAX_PERKS_STRIKER,

        midfielderMaxPotential: midfielderMaxPotential,
        midfielderPerks: midfielderPerks,
        midfielderPerksScore: midfielderPerks / MAX_PERKS_MIDFIELDER,

        defenderMaxPotential: defenderMaxPotential,
        defenderPerks: defenderPerks,
        defenderPerksScore: defenderPerks / MAX_PERKS_DEFENDER,

        goalkeeperMaxPotential: goalkeeperMaxPotential,
        goalkeeperPerks: goalkeeperPerks,
        goalkeeperPerksScore: goalkeeperPerks / MAX_PERKS_GOALKEEPER,

        totalMaxPotential: totalMaxPotential,
        totalMaxPotentialPercentage: totalMaxPotential / MAX_STATS,

        maxPotential: calculateMaxPotential(strikerMaxPotential, midfielderMaxPotential, defenderMaxPotential, goalkeeperMaxPotential)
    }
}
