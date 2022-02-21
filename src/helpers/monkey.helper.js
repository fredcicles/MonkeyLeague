import { FieldPositionPerks, FieldPositionNames, TraitNames } from '../constants/monkey.constants'

const getTraitValue = (monkey, traitName) => {
    const value = monkey.attributes.find(attribute => attribute.trait_type === traitName).value
    return value
}

const getFieldPositionMaxPotential = (monkey, fieldPosition) => {
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

// Perform any data transformation here
export const formatRawMonkeyData = monkeys => {
    return monkeys.map(monkey => {
        const totalMaxPotential =
            Number(getTraitValue(monkey, TraitNames.MaxAccuracy)) +
            Number(getTraitValue(monkey, TraitNames.MaxPassing)) +
            Number(getTraitValue(monkey, TraitNames.MaxDefense)) +
            Number(getTraitValue(monkey, TraitNames.MaxControl))

        const strikerPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Striker)
        const midfielderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Midfielder)
        const defenderPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Defender)
        const goalkeeperPerks = getFieldPositionPerksTotal(monkey, FieldPositionNames.Goalkeeper)

        return {
            name: getTraitValue(monkey, TraitNames.Name),
            id: getTraitValue(monkey, TraitNames.ID),
            alphaScore: getTraitValue(monkey, TraitNames.AlphaScore),
            maxAccuracy: getTraitValue(monkey, TraitNames.MaxAccuracy),
            maxPassing: getTraitValue(monkey, TraitNames.MaxPassing),
            maxDefense: getTraitValue(monkey, TraitNames.MaxDefense),
            maxControl: getTraitValue(monkey, TraitNames.MaxControl),

            strikerMaxPotential: getFieldPositionMaxPotential(monkey, FieldPositionNames.Striker),
            strikerPerks: strikerPerks,
            strikerPerksScore: strikerPerks / 0.63,

            midfielderMaxPotential: getFieldPositionMaxPotential(monkey, FieldPositionNames.Midfielder),
            midfielderPerks: midfielderPerks,
            midfielderPerksScore: midfielderPerks / 0.60,
            
            defenderMaxPotential: getFieldPositionMaxPotential(monkey, FieldPositionNames.Defender),
            defenderPerks: defenderPerks,
            defenderPerksScore: defenderPerks / 0.59,
            
            goalkeeperMaxPotential: getFieldPositionMaxPotential(monkey, FieldPositionNames.Goalkeeper),
            goalkeeperPerks: goalkeeperPerks,
            goalkeeperPerksScore: goalkeeperPerks / 0.58,

            totalMaxPotential: totalMaxPotential,
            totalMaxPotentialPercentage: totalMaxPotential / 400
        }
    })
}
