# coding=gb2312

import random

# 个体数量
INDIVIDUAL_AMOUNT = 100

# 个体的基因数量
GENE_AMOUNT = 100

# 单个基因突变机率
GENETIC_LOTTERY_CHANCE = 0.05

# 交叉变异的机率
CROSS_VARIATION_CHANCE = 0.02

# 迭代次数
ITERATION_AMOUNT = 30

# 获取个体群
def getIndividuals() :
	individuals = []
	for index in range(INDIVIDUAL_AMOUNT):
		individual = []
		for index in range(GENE_AMOUNT):
			individual.push(random.randint(0, 1))
		individuals.push(individual)


# 获取个体适应度
def getIndividualFitness(individual) :
	return sum(individual)


# 选择下一代个体
def getNextGenerationIndividuals(individuals):
	# 根据适应度获取扩充个体
	nextExtendIndividuals = []
	for individual in individuals:
		fitness = getIndividualFitness(individual)
		for index in range(fitness // 10):
			nextExtendIndividuals.push(individual.view())
	# 压缩个数数量
	extendIndividuals = []
	nextExtendIndividualsAmount = len(nextExtendIndividuals)
	for index in range(INDIVIDUAL_AMOUNT):
		extendIndividuals.push(nextExtendIndividuals[random.randint(0, nextExtendIndividualsAmount)]) #randint和数组长度可以有bug
	return extendIndividuals

# 对个体进行变异
def individualGeneLottery(individual):
	for index in range(GENE_AMOUNT):
		if random.random() < GENETIC_LOTTERY_CHANCE:
			individual[index] = 1 if individual[index] == 0 else 0

# 交叉变异
def individualCrossVariation(individual1, individual2):
	crossIndex1 = random.randint(GENE_AMOUNT)
	crossIndex2 = random.randint(GENE_AMOUNT)
	for index in range(min(crossIndex1, crossIndex2), max(crossIndex1, crossIndex2)):
		individual1[index], individual2[index] = individual2[index], individual1[index]

# 对群落进行变异
def individualsVariation(individuals):
	for individual in individuals:
		individualGeneLottery(individual)
		if(random.random() < CROSS_VARIATION_CHANCE):
			crossIndividual = individuals[random.randint(INDIVIDUAL_AMOUNT)]
			individualCrossVariation(individual, crossIndividual)

if __name__ =='__main__':
	individuals = getIndividuals()
	for index in range(ITERATION_AMOUNT):
		individuals = getNextGenerationIndividuals(individuals)
		individualsVariation(individuals)
	print(individuals)